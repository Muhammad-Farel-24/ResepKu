document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const formTitle = document.getElementById('form-title');
    const recipeIdInput = document.getElementById('recipe-id');
    const recipeImageInput = document.getElementById('recipe-image');
    const submitButton = recipeForm.querySelector('.btn-submit');

    let currentImageBase64 = ''; // To store existing image data for edit mode
    let selectedFile = null; // To store the newly selected file

    // Event listener for file input change
    recipeImageInput.addEventListener('change', (e) => {
        selectedFile = e.target.files[0];
    });

    // Cek apakah ada ID di URL (untuk mode edit)
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');

    const loadRecipeForEdit = async (id) => {
        try {
            const response = await fetch(`/api/recipes/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const recipeToEdit = await response.json();

            formTitle.innerText = 'Edit Resep';
            recipeIdInput.value = recipeToEdit.id;
            document.getElementById('recipe-name').value = recipeToEdit.name;
            document.getElementById('recipe-desc').value = recipeToEdit.description; // Use 'description'
            currentImageBase64 = recipeToEdit.image || '';
            document.getElementById('recipe-ingredients').value = Array.isArray(recipeToEdit.ingredients) ? recipeToEdit.ingredients.join(', ') : '';
            document.getElementById('recipe-steps').value = Array.isArray(recipeToEdit.steps) ? recipeToEdit.steps.join('\n') : '';
            document.getElementById('recipe-history').value = recipeToEdit.history || '';
            document.getElementById('recipe-tools').value = Array.isArray(recipeToEdit.tools) ? recipeToEdit.tools.join(', ') : '';
        } catch (error) {
            console.error(`Error loading recipe for edit with id ${id}:`, error);
            alert('Gagal memuat resep untuk diedit.');
        }
    };

    if (recipeId) {
        loadRecipeForEdit(recipeId);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = 'Menyimpan...';

        const id = recipeIdInput.value;

        let imageData = currentImageBase64;

        if (selectedFile) {
            imageData = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(selectedFile);
            });
        } else if (!id) {
            imageData = 'images/default-recipe.jpg';
        }

        const recipeData = {
            name: document.getElementById('recipe-name').value,
            description: document.getElementById('recipe-desc').value, // Use 'description'
            image: imageData,
            ingredients: document.getElementById('recipe-ingredients').value.split(',').map(item => item.trim()).filter(item => item !== ''),
            steps: document.getElementById('recipe-steps').value.split('\n').map(item => item.trim()).filter(item => item !== ''),
            history: document.getElementById('recipe-history').value,
            tools: document.getElementById('recipe-tools').value.split(',').map(item => item.trim()).filter(item => item !== ''),
            rating: 4 // default rating
        };

        try {
            let response;
            if (id) { // Mode Edit
                response = await fetch(`/api/recipes/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(recipeData),
                });
            } else { // Mode Tambah
                response = await fetch('/api/recipes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(recipeData),
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert('Resep berhasil disimpan!');
            window.location.href = 'index.html#resep-section'; // Redirect ke halaman utama
        } catch (error) {
            console.error('Error saving recipe:', error);
            alert('Gagal menyimpan resep. Silakan coba lagi.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Simpan Resep';
        }
    };

    recipeForm.addEventListener('submit', handleFormSubmit);
});
