import Publication from "./publications.model.js";
import upload from "../middlewares/multerConfig.js";
export const createPublication = async (req, res) => {
    upload.single('img')(req, res, async (err) => {
        if (err) {
            console.log(req.file);
            return res.status(500).json({
                msg: "Image has not been uploaded",
                errors: err.message,
            });

        }
        try {
            const user = req.user;
            const { title, content } = req.body;
            if (user.role !== "ADMIN_ROLE" ) {
                return res.status(401).json({
                    msg: "You are not authorized to create a publication",
                });
            }
            console.log('este es el role ' + user.role);

            const newPublication = new Publication({
                title,
                content,
                author: req.user._id,
                img: req.file.path,
            });
            await newPublication.save();

            return res.status(200).json({
                msg: "Publication has been created",
                publication: newPublication,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({

                msg: "Publication has not been created",
                errors: error,
            });
        }
    });



    // try {
    //     const { title, content } = req.body;
    //     // const validattion = validateImg(req.file, 'Y');

    //         const newPublication = new Publication({
    //             title,
    //             content,
    //             author: req.user._id,
    //         });
    //         await newPublication.save();

    //         return res.status(200).json({
    //             msg: "Publication has been created",
    //             publication: newPublication,
    //         });

    // } catch (error) {
    //     return res.status(500).json({
    //         msg: "Publication has not been created",
    //         errors: error,
    //     });
    // }
}