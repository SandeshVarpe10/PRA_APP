const db = require("../../db.js");



function textToVector(text) {
    const words = text.toLowerCase().split(/\W+/);
    const vector = {};
    words.forEach(w => {
        if (vector[w]) vector[w] += 1;
        else vector[w] = 1;
    });
    return vector;
}

// cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
    let dot = 0, magA = 0, magB = 0;
    const keys = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
    keys.forEach(k => {
        const a = vecA[k] || 0;
        const b = vecB[k] || 0;
        dot += a * b;
        magA += a * a;
        magB += b * b;
    });
    if (magA === 0 || magB === 0) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// get recommended products
exports.getRecommendedProducts = async (userId) => {
    // 1️⃣ User history
    const history = await new Promise((resolve, reject) => {
        db.query("SELECT product_id FROM cart WHERE user_id=?", [userId], (err, result) => {
            if (err) reject(err);
            else resolve(result.map(r => r.product_id));
        });
    });

    if (history.length === 0) return []; // no history

    // 2️⃣ All products
    const products = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM products", (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });

    // 3️⃣ Create user profile vector
    const userVectors = history.map(pid => {
        const prod = products.find(p => p.id === pid);
        return textToVector(prod ? prod.description : "");
    });

    const userProfile = {};
    userVectors.forEach(vec => {
        for (let k in vec) {
            userProfile[k] = (userProfile[k] || 0) + vec[k];
        }
    });

    // 4️⃣ Compute similarity with all products
    const recommendations = products
        .filter(p => !history.includes(p.id))
        .map(p => {
            const vec = textToVector(p.description);
            const score = cosineSimilarity(userProfile, vec);
            return { ...p, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 10); // top 10

    return recommendations;
};
