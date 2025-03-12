import { Post,postValidation } from '../models/Post.js';
import asyncHandler from "express-async-handler";
import { User } from '../models/User.js';

const getPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


// Ajouter un nouveau post
const addPost = asyncHandler(async (req, res) => {
  req.body.user_id = req.user;

  // Vérifier si tags est une chaîne et la convertir en tableau
  if (typeof req.body.tags === "string") {
    req.body.tags = req.body.tags.split(",").map(tag => tag.trim());
  } else if (!Array.isArray(req.body.tags)) {
    req.body.tags = [];
  }

  // Vérifier que chaque tag commence par "#" (au cas où l'utilisateur les entre mal)
  req.body.tags = req.body.tags.map(tag => 
    tag.startsWith("#") ? tag : `#${tag}`
  );

  const { error } = postValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { user_id, content, tags } = req.body;
  const media = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    const newPost = new Post({
      user_id,
      content,
      media,
      tags,
    });

    await newPost.save();

    res.status(201).json({
      message: 'Post créé avec succès',
      post: newPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création du post' });
  }
});

//checkpost
const checkPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post introuvable' });
    } else {
      res.status(200).json(post);
    } 
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
);
//deletePost
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post introuvable' });
    } else {
      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: 'Post supprimé avec succès' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
);


const searchPosts = asyncHandler(async (req, res) => {
    const { query } = req.query; // On récupère la chaîne de recherche

    if (!query) {
        return res.status(400).json({ error: "Veuillez entrer un terme de recherche" });
    }

    try {
        let posts = [];

        // Vérifier si la requête contient un hashtag
        if (query.includes("#")) {
            // Extraire tous les hashtags de la requête
            const tagsArray = query.split(" ")
                .filter(word => word.startsWith("#")) // Garde seulement les mots commençant par #
                .map(tag => tag.trim());

            if (tagsArray.length > 0) {
                posts = await Post.find({ tags: { $all: tagsArray } }).populate("user_id", "pseudo");
            }
        } 
        
        // Sinon, recherche par pseudo
        if (posts.length === 0) {
            const user = await User.findOne({ pseudo: { $regex: new RegExp(query, "i") } });

            if (user) {
                posts = await Post.find({ user_id: user._id }).populate("user_id", "pseudo");
            }
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche de posts" });
    }
});

export { getPosts,addPost,checkPost,deletePost,searchPosts };