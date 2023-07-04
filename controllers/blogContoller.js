import blogSchema from "../models/blogModel.js"
import userSchema from "../models/userModel.js";

export const createBlogsController = async (req, res, next) => {
    try {
        const { title, description, image } = req.body;
        console.log(req.user)
        if (!title || !description || !image) {

            return res.status(400).send({
                success: false,
                message: "Please Provide ALl Fields",
            });
        }
        const userDetails = await userSchema.findById(req.user);
        const newBlog = new blogSchema({ title, description, image });
        userDetails.blogs.push(newBlog._id);
        await userDetails.save()
        await newBlog.save();


        return res.status(201).send({
            success: true,
            message: "Blog Created!",
        });

    } catch (err) {
        console.log(err)
    }
}


export const getAllBlogsController = async (req, res, next) => {
    try {
        let allBlogs = await blogSchema.find();
        return res.status(200).send({
            success: true,
            message: "Blog Created!",
            allBlogs
        });
    } catch (err) {
        console.log(err)
    }

}

export const getAllUserBlogsController = async (req, res, next) => {
    try {
        let allUserBlogs = await userSchema.findById(req.user);
        let allBlogs = await blogSchema.find();
        let newBlog = []
        allBlogs.map((it) => {
            allUserBlogs.blogs.map((item) => {
                if (it._id.toString() == item._id.toString()) {
                    newBlog.push(it)
                }
            })
        })
        return res.status(200).send({
            success: true,
            message: "Blog Created!",
            newBlog
        });

    } catch (err) {
        console.log(err)
    }

}



export const deleteblogByIdController = async (req, res, next) => {
    let id = req.params.id;
    let blog = await userSchema.findById(req.user)
    console.log(blog)
    if (!blog.blogs.includes(id)) {
        return res.status(400).send({
            success: false,
            message: "Please Provide authenticated id",
        });
    }

    blog.blogs = blog.blogs.filter((item) => item._id.toString() !== req.params.id)
    await blog.save()
    return res.status(200).send({
        success: true,
        message: "Blog Deleted!",
    });
}


export const updateBlogController = async (req, res, next) => {
    let id = req.params.id;

}