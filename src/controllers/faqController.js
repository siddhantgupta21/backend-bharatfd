import FAQ from "../models/Faq.js";
import translateText from "../services/translationService.js";
import redisClient from "../services/redis.js";
import languages from "../constants/lang.js";

export const createFAQ = async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: "Question and Answer are required" });
    }

    const translations = {};
    for (const lang of languages) {
      translations[lang] = {
        question: await translateText(question, lang),
        answer: await translateText(answer, lang),
      };
    }

    const faq = new FAQ({ question, answer, translations });
    await faq.save();

    if (redisClient.isOpen) {
      const cacheKeys = await redisClient.keys("faqs:*");
      if (cacheKeys.length > 0) {
        await redisClient.del(cacheKeys);
      }
    }

    res.status(201).json({ message: "FAQ created successfully", data: faq });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
};

export const getFAQs = async (req, res, next) => {
  try {
    const { lang = "en" } = req.query;
    const cacheKey = `faqs:${lang}`;

    if (redisClient.isOpen) {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
    }

    const faqs = await FAQ.find();
    const translatedFAQs = faqs.map((faq) => ({
      _id: faq._id,
      question: faq.translations?.[lang]?.question || faq.question,
      answer: faq.translations?.[lang]?.answer || faq.answer,
    }));

    if (redisClient.isOpen) {
      await redisClient.set(cacheKey, JSON.stringify(translatedFAQs), {
        EX: 3600, // Cache for 1 hour
      });
    }

    res.status(200).json(translatedFAQs);
  } catch (error) {
    next(error);
  }
};
