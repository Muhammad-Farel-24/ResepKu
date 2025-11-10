document.addEventListener('DOMContentLoaded', () => {
    const detailContainer = document.getElementById('detail-container');

    // Ambil ID resep dari parameter URL
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');

    if (!recipeId) {
        detailContainer.innerHTML = '<p>Resep tidak ditemukan. ID tidak valid.</p>';
        return;
    }

    // Ambil semua resep dari localStorage
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    
    // Cari resep yang sesuai dengan ID
    const recipe = recipes.find(r => r.id == recipeId);

    if (!recipe) {
        detailContainer.innerHTML = '<p>Resep tidak ditemukan atau sudah dihapus.</p>';
        return;
    }

    // Set judul halaman
    document.title = `${recipe.name} - ResepKu`;

    // Buat HTML untuk ditampilkan
    detailContainer.innerHTML = `
        <a href="index.html#resep" class="back-link">&larr; Kembali ke Daftar Resep</a>
        <div class="recipe-detail-header">
            <h1>${recipe.name}</h1>
        </div>
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-detail-image">
        
        <div class="recipe-detail-content">
            <h3>Sejarah Singkat</h3>
            <p>${recipe.history}</p>

            <h3>Peralatan yang Dibutuhkan</h3>
            <ul>
                ${recipe.tools.map(tool => `<li>${tool}</li>`).join('')}
            </ul>

            <h3>Bahan-bahan</h3>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>

            <h3>Langkah-langkah Pembuatan</h3>
            <ol>
                ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
    `;
});
