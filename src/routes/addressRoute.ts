import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { addressController } from '../controllers/address/addressController';

const addressRouter = express
  .Router()
  .post('/', verifyToken, addressController.createAddress)
  .get('/', verifyToken, addressController.getAddresses)
  .get('/:id', verifyToken, addressController.getAddressById)
  .put('/:id', verifyToken, addressController.editAddress)
  .delete('/:id', verifyToken, addressController.deleteAddress);

export { addressRouter };
