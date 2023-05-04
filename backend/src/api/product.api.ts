import { Router } from 'express';
import {
  HttpCode,
  productApiPathEnum,
  rootApiPathEnum,
  userApiPathEnum,
} from '../common/enums';
import { productService, uploadImageService } from '../services';
import { checkIsFound } from '~/utils';
import { multerUploadFile } from '~/middleware/upload-fille.middleware';

export const initProductApi = (apiRouter: Router): Router => {
  const productRouter = Router();
  const upload = multerUploadFile();

  apiRouter.use(rootApiPathEnum.Products, productRouter);

  productRouter.get(productApiPathEnum.All, async (_req, res) => {
    try {
      let products = await productService.getAllProducts();

      res.status(checkIsFound(products)).json(products);
    } catch (error) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json([]);
    }
  });

  productRouter.get(userApiPathEnum.$ID, async (_req, res) => {
    try {
      const product = await productService.getById(Number(_req.params.id || 0));

      res.status(checkIsFound(product?.[0])).json(product?.[0] || {});
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({ message: error?.message });
    }
  });

  productRouter.post(
    userApiPathEnum.ROOT,
    upload.single('image'),
    async (_req, res) => {
      try {
        const image = await uploadImageService.uploadImage(_req.file);
        const product = await productService.createNewProduct({
          ...JSON.parse(_req?.body?.data),
          image: image,
        });

        res.status(HttpCode.OK).json(product);
      } catch (err) {
        const error = err?.errors?.[0];

        await uploadImageService.deleteUploadedImage(
          error?.instance?.image || '',
        );
        res.status(HttpCode.BAD_REQUEST).json({ message: error?.message });
      }
    },
  );

  productRouter.patch(
    userApiPathEnum.$ID,
    upload.single('image'),
    async (_req, res) => {
      try {
        if (_req.file) {
          await uploadImageService.deleteUploadedImage(_req.body.image);
          _req.body.image = await uploadImageService.uploadImage(_req.file);
        }

        const product = await productService.updateProduct(
          _req.params.id,
          _req.body,
        );

        res.status(checkIsFound(product)).json(product?.[0]);
      } catch (err) {
        const error = err?.errors?.[0];

        await uploadImageService.deleteUploadedImage(error.instance.image);
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    },
  );

  productRouter.delete(userApiPathEnum.$ID, async (_req, res) => {
    try {
      const product = await productService.getById(Number(_req.params.id || 0));
      await uploadImageService.deleteUploadedImage(product.image);
      await productService.deleteProduct(_req.params.id);

      res.status(HttpCode.NO_CONTENT).json('Success');
    } catch (err) {
      const error = err?.errors?.[0];
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error?.message });
    }
  });

  return productRouter;
};
