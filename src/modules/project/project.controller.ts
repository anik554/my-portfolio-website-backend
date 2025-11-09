import { Request, Response } from "express";
import { ProjectServices } from "./project.service";

const createProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectServices.createProject(req.body);
    res.status(201).json({
      statusCode: 201,
      message: "Project Created Successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({ error: "Faild to Create Project", details: error });
  }
};

const getAllProject = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectServices.getAllProject();
    res.status(200).json({
      statusCode: 200,
      message: "All project Retrived Successfully",
      data: projects,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Faild to retrived project data", details: error });
  }
};

const singleProject = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);
    const project = await ProjectServices.singleProject(projectId);
    res.status(200).json({
      statusCode: 200,
      message: "Single Project Retrived Successfully",
      data: project,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Faild to retrived project data", details: error });
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const singleProject = await ProjectServices.updateProject(
      Number(projectId),
      req.body
    );
    res.status(201).json({
      statusCode: 201,
      message: "Project Updated Successfully",
      data: singleProject,
    });
  } catch (error) {
    res.status(500).json({ error: "Faild to update project", details: error });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    await ProjectServices.deleteproject(Number(projectId));
    res.status(404).json({
      statusCode: 404,
      message: "Project Deleted Successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ error: "Faild to delete project", details: error });
  }
};

export const ProjectControllers = {
  createProject,
  getAllProject,
  singleProject,
  updateProject,
  deleteProject
};
