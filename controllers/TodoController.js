import TodoSchema from "../models/Todo.js";
import UserSchema from "../models/User.js";

export const getAll = async (req, res) => {
  try {
    const tasks = await TodoSchema.find().populate("user");

    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить задачи",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const todoId = req.params.id;

    const updatedTodo = await TodoSchema.findOneAndUpdate(
      {
        _id: todoId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true,
      }
    ).populate("user");

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Задача не найдена",
      });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось получить задачу",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const todoId = req.params.id;

    const deletedTodo = await TodoSchema.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Задача не найдена",
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось удалить задачу",
    });
  }
};

export const create = async (req, res) => {
  try {
    const todo = new TodoSchema({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      user: req.userId,
    });

    const createdTodo = await todo.save();

    const user = await UserSchema.findById(req.userId).populate("tasks");

    user.tasks.push(createdTodo);

    await user.save();

    res.json(createdTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать задачу",
    });
  }
};

export const update = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { started, completed } = req.body;

    let updatedTodo;

    if (started && started === true) {
      updatedTodo = await TodoSchema.findByIdAndUpdate(
        todoId,
        {
          started: true,
          startTime: Date.now(),
        },
        { new: true }
      ).populate("user");
    } else if (completed && completed === true) {
      updatedTodo = await TodoSchema.findByIdAndUpdate(
        todoId,
        {
          completed: true,
        },
        { new: true }
      ).populate("user");

      const { startTime } = updatedTodo;
      const timeTaken = Date.now() - startTime;

      updatedTodo.timeTaken = timeTaken;
    } else {
      updatedTodo = await TodoSchema.findByIdAndUpdate(
        todoId,
        {
          title: req.body.title,
          description: req.body.description,
          date: req.body.date,
          user: req.userId,
        },
        { new: true }
      ).populate("user");
    }

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Задача не найдена",
      });
    }

    res.json({
      success: true,
      data: updatedTodo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось обновить задачу",
    });
  }
};
