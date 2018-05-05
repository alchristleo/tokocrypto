import { schema } from 'normalizr';

export const transactionSchema = new schema.Entity(
    "transactions", 
    {}, 
    { idAttribute: "_id" }
);