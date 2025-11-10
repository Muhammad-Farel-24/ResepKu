document.addEventListener('DOMContentLoaded', () => {
    const detailContainer = document.getElementById('detail-container');

    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');

    if (!recipeId) {
        detailContainer.innerHTML = '<p>Resep tidak ditemukan. ID tidak valid.</p>';
        return;
    }

    const fetchRecipeDetail = async (id) => {
        try {
            detailContainer.innerHTML = '<p>Memuat detail resep...</p>'; // Loading state
            const response = await fetch(`/api/recipes/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    detailContainer.innerHTML = '<p>Resep tidak ditemukan atau sudah dihapus.</p>';
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return;
            }
            const recipe = await response.json();

            // Set judul halaman
            document.title = `${recipe.name} - ResepKu`;

            // Buat HTML untuk ditampilkan
            detailContainer.innerHTML = `
                <a href="index.html#resep-section" class="back-link">&larr; Kembali ke Daftar Resep</a>
                <div class="recipe-detail-header">
                    <h1>${recipe.name}</h1>
                </div>
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe-detail-image">
                
                <div class="recipe-detail-content">
                    <h3>Deskripsi</h3>
                    <p>${recipe.description}</p>

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
        } catch (error) {
            console.error(`Error fetching recipe with id ${id}:`, error);
            detailContainer.innerHTML = '<p>Gagal memuat detail resep. Silakan coba lagi nanti.</p>'; // Error state
        }
    };

    fetchRecipeDetail(recipeId);
});