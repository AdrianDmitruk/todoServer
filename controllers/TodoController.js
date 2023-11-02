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

    if (started) {
      if (started === true) {
        const todoToUpdate = { started: true };
        if (req.body.startTime) {
          todoToUpdate.startTime = req.body.startTime;
        } else {
          todoToUpdate.startTime = Date.now();
        }

        updatedTodo = await TodoSchema.findByIdAndUpdate(todoId, todoToUpdate, {
          new: true,
        }).populate("user");
      } else {
        return res.status(400).json({
          message: "Некорректное значение флага 'started'",
        });
      }
    } else if (completed) {
      if (completed === true) {
        updatedTodo = await TodoSchema.findById(todoId).populate("user");

        if (updatedTodo) {
          updatedTodo.completed = true;
          if (!updatedTodo.startTime) {
            updatedTodo.startTime = Date.now();
          }
          const timeTaken = Date.now() - updatedTodo.startTime;
          updatedTodo.timeTaken = timeTaken;

          await updatedTodo.save();
        } else {
          return res.status(404).json({
            message: "Задача не найдена",
          });
        }
      } else {
        return res.status(400).json({
          message: "Некорректное значение флага 'completed'",
        });
      }
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
