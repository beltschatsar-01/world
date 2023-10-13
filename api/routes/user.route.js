import express from "express";


const router = express.Router();

router.get('/tets', (req,res)=> {
    res.json({
        message:'hello world',
    });
}
);

export default router;