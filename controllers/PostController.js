import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const searchTerm = req.query.searchTerm || ""; // Получаем ключевое слово для поиска из запроса
    const selectedMonth = req.query.month || null; // Получаем выбранный месяц из запроса
    const selectedYear = req.query.year || null; // Получаем выбранный год из запроса

    const sortField = req.query.sortField || "createdAt"; // Поле для сортировки, по умолчанию - 'createdAt'
    const sortOrder = req.query.sortOrder || "desc"; // Порядок сортировки, по умолчанию - 'desc'

    const query = {
      title: {
        $regex: searchTerm,
        $options: "i",
      },
    };

    if (selectedMonth !== null && selectedMonth !== "all") {
      query.month = selectedMonth;
    }

    if (selectedYear !== null) {
      query.year = selectedYear;
    }

    const sortOptions = {};
    sortOptions[sortField] = sortOrder;

    const totalPosts = await PostModel.countDocuments(query);

    const posts = await PostModel.find(query)
      .populate("user")
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limit)
      .exec();

    res.json({
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedDoc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true,
      }
    ).populate("user");

    if (!updatedDoc) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json(updatedDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось получить статью",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedDoc = await PostModel.findOneAndDelete({
      _id: postId,
    });

    if (!deletedDoc) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось удалить статью",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      type: req.body.type,
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      location: req.body.location,
      main: req.body.main,
      mainEvening: req.body.mainEvening,
      gameCam: req.body.gameCam,
      gameCamLink: req.body.gameCamLink,
      gameDrone: req.body.gameDrone,
      gameDroneLink: req.body.gameDroneLink,
      gp: req.body.gp,
      gpLink: req.body.gpLink,
      gpEvening: req.body.gpEvening,
      gpLinkEvening: req.body.gpLinkEvening,
      upr1: req.body.upr1,
      upr1Link: req.body.upr1Link,
      upr2: req.body.upr2,
      upr2Link: req.body.upr2Link,
      upr3: req.body.upr3,
      upr3Link: req.body.upr3Link,
      upr4: req.body.upr4,
      upr4Link: req.body.upr4Link,
      upr5: req.body.upr5,
      upr5Link: req.body.upr5Link,
      upr6: req.body.upr6,
      upr6Link: req.body.upr6Link,
      tgPost: req.body.tgPost,
      upr1Evening: req.body.upr1Evening,
      upr1LinkEvening: req.body.upr1LinkEvening,
      upr2Evening: req.body.upr2Evening,
      upr2LinkEvening: req.body.upr2LinkEvening,
      upr3Evening: req.body.upr3Evening,
      upr3LinkEvening: req.body.upr3LinkEvening,
      upr4Evening: req.body.upr4Evening,
      upr4LinkEvening: req.body.upr4LinkEvening,
      upr5Evening: req.body.upr5Evening,
      upr5LinkEvening: req.body.upr5LinkEvening,
      upr6Evening: req.body.upr6Evening,
      upr6LinkEvening: req.body.upr6LinkEvening,
      tgPostEvening: req.body.tgPostEvening,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Нет удалось создать статью",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedDoc = await PostModel.findByIdAndUpdate(
      postId,
      {
        title: req.body.title,
        type: req.body.type,
        day: req.body.day,
        month: req.body.month,
        year: req.body.year,
        gameCam: req.body.gameCam,
        gameCamLink: req.body.gameCamLink,
        gameDrone: req.body.gameDrone,
        gameDroneLink: req.body.gameDroneLink,
        upr1: req.body.upr1,
        upr1Link: req.body.upr1Link,
        upr2: req.body.upr2,
        upr2Link: req.body.upr2Link,
        upr3: req.body.upr3,
        upr3Link: req.body.upr3Link,
        upr4: req.body.upr4,
        upr4Link: req.body.upr4Link,
        upr5: req.body.upr5,
        upr5Link: req.body.upr5Link,
        upr6: req.body.upr6,
        upr6Link: req.body.upr6Link,
        upr7: req.body.upr7,
        upr7Link: req.body.upr7Link,
        upr8: req.body.upr8,
        upr8Link: req.body.upr8Link,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags ? req.body.tags.split(",") : [],
      },
      { new: true }
    ).populate("user");

    if (!updatedDoc) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json({
      success: true,
      data: updatedDoc,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
