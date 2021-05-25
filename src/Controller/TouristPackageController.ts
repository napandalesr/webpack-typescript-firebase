import { config } from "../databases/config";

export class TouristPackageController
{
  private firebase;

  constructor(){
    this.firebase=new config();
  }
  create= async (req,res)=>{
    const firestore=this.firebase.initial().firestore();
    const data=req.body;
    try {
      await firestore.collection('prueba').doc().set(data);
      res.send('Ok');
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}