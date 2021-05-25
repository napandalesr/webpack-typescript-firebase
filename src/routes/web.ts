import { Router } from "express";
import { Request, Response } from 'express';
import { TouristPackageController } from "../Controller/TouristPackageController";

const router = Router();
const TouristPackage= new TouristPackageController();

router.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});

router.post('/TouristPackage',TouristPackage.create);


export {
  router
}