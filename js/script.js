document.addEventListener('DOMContentLoaded', () => {
    const recipeGrid = document.getElementById('recipe-grid');
    const searchInput = document.getElementById('searchInput');
    let allRecipes = []; // Akan diisi dari API

    const fetchRecipes = async () => {
        try {
            recipeGrid.innerHTML = '<p>Memuat resep...</p>'; // Loading state
            const response = await fetch('/api/recipes');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const recipes = await response.json();
            allRecipes = recipes;
            displayRecipes(allRecipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            recipeGrid.innerHTML = '<p>Gagal memuat resep. Silakan coba lagi nanti.</p>'; // Error state
        }
    };

    const deleteRecipe = async (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus resep ini?')) {
            try {
                const response = await fetch(`/api/recipes/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Refresh the list after deletion
                fetchRecipes();
            } catch (error) {
                console.error(`Error deleting recipe with id ${id}:`, error);
                alert('Gagal menghapus resep. Silakan coba lagi.');
            }
        }
    };

    const displayRecipes = (recipes) => {
        recipeGrid.innerHTML = '';
        if (!recipes || recipes.length === 0) {
            recipeGrid.innerHTML = '<p>Tidak ada resep yang ditemukan.</p>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <div class="recipe-image-wrapper">
                    <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
                </div>
                <div class="recipe-card-content">
                    <h3>${recipe.name}</h3>
                    <p>${recipe.description}</p>
                    <div class="rating">
                        ${'★'.repeat(recipe.rating)}${'☆'.repeat(5 - recipe.rating)}
                    </div>
                    <div class="card-actions">
                        <button class="btn-edit" data-id="${recipe.id}">Edit</button>
                        <button class="btn-delete" data-id="${recipe.id}">Hapus</button>
                    </div>
                </div>
            `;

            // Klik pada gambar atau judul untuk ke halaman detail
            recipeCard.querySelector('.recipe-image').addEventListener('click', () => {
                window.location.href = `resep-detail.html?id=${recipe.id}`;
            });
            recipeCard.querySelector('h3').addEventListener('click', () => {
                window.location.href = `resep-detail.html?id=${recipe.id}`;
            });

            // Event listener untuk tombol edit dan hapus
            recipeCard.querySelector('.btn-edit').addEventListener('click', (e) => {
                e.stopPropagation(); // Mencegah klik trigger ke halaman detail
                window.location.href = `upload.html?id=${recipe.id}`;
            });

            recipeCard.querySelector('.btn-delete').addEventListener('click', (e) => {
                e.stopPropagation(); // Mencegah klik trigger ke halaman detail
                deleteRecipe(recipe.id);
            });

            recipeGrid.appendChild(recipeCard);
        });
    };

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRecipes = allRecipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm)
        );
        displayRecipes(filteredRecipes);
    });

    // Initial fetch of recipes
    fetchRecipes();
});
