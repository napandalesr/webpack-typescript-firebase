
import * as express from 'express';
import * as path from "path";

export class serve
{
  private app;
  private PORT = process.env.PORT || 3000;

  constructor(){
    this.app = express();
  }
  
  start=()=>{
    this.app.use(express.json());
    this.app.listen(this.PORT, () => {
      console.log('server started at http://localhost:'+this.PORT);
    });
    return this.app;
  }
}