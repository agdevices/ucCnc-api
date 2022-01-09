const express = require(`express`);
const router = express.Router();
const cors = require('cors')
const port = process.env.PORT || 3001;
const app = express();

app.use(express.json())
app.use(router)
app.use(cors())

const indexRouter = require(`./routers/index`)
app.use(indexRouter);
// const menuRouter = require(`./routers/menu`)
// app.use(menuRouter);
// const usRouter = require(`./routers/us`)
// app.use(usRouter);
// const servicesRouter = require(`./routers/services`)
// app.use(servicesRouter);
// const galleryRouter = require(`./routers/gallery`)
// app.use(galleryRouter);
// const materialsRouter = require(`./routers/materials`)
// app.use(materialsRouter);
// const footerRouter = require(`./routers/footer`)
// app.use(footerRouter);

  
app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
  });