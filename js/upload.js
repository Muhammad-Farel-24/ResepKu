document.addEventListener('DOMContentLoaded', () => {

    const recipeForm = document.getElementById('recipe-form');
    const formTitle = document.getElementById('form-title');
    const recipeIdInput = document.getElementById('recipe-id');
    const recipeImageInput = document.getElementById('recipe-image'); // New reference

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let currentImageBase64 = ''; // To store existing image data for edit mode
    let selectedFile = null; // To store the newly selected file

    const saveRecipes = () => {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    };

    // Event listener for file input change
    recipeImageInput.addEventListener('change', (e) => {
        selectedFile = e.target.files[0];
    });

    // Cek apakah ada ID di URL (untuk mode edit)
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');

    if (recipeId) {
        const recipeToEdit = recipes.find(r => r.id == recipeId);
        if (recipeToEdit) {
            formTitle.innerText = 'Edit Resep';
            recipeIdInput.value = recipeToEdit.id;
            document.getElementById('recipe-name').value = recipeToEdit.name;
            document.getElementById('recipe-desc').value = recipeToEdit.desc;
            // For image, we can't pre-fill file input, but we can store its current value
            currentImageBase64 = recipeToEdit.image || ''; // Store existing image data
            document.getElementById('recipe-ingredients').value = Array.isArray(recipeToEdit.ingredients) ? recipeToEdit.ingredients.join(', ') : '';
            document.getElementById('recipe-steps').value = Array.isArray(recipeToEdit.steps) ? recipeToEdit.steps.join('\n') : '';
            document.getElementById('recipe-history').value = recipeToEdit.history || '';
            document.getElementById('recipe-tools').value = Array.isArray(recipeToEdit.tools) ? recipeToEdit.tools.join(', ') : '';
        }
    }

    const handleFormSubmit = async (e) => { // Make it async
        e.preventDefault();
        const id = recipeIdInput.value;

        let imageData = currentImageBase64; // Start with existing image data

        if (selectedFile) { // If a new file is selected, read it
            imageData = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(selectedFile);
            });
        } else if (!id) { // If it's a new recipe and no file is selected, set a default image or handle error
            // Optionally, you can set a default image here or show an error
            imageData = 'images/default-recipe.jpg'; // Example default image
        }


        const recipeData = {
            name: document.getElementById('recipe-name').value,
            desc: document.getElementById('recipe-desc').value,
            image: imageData, // Use the processed image data
            ingredients: document.getElementById('recipe-ingredients').value.split(',').map(item => item.trim()),
            steps: document.getElementById('recipe-steps').value.split('\n').map(item => item.trim()),
            history: document.getElementById('recipe-history').value,
            tools: document.getElementById('recipe-tools').value.split(',').map(item => item.trim()),
            rating: 4 // default rating
        };

        if (id) { // Mode Edit
            const index = recipes.findIndex(r => r.id == id);
            recipes[index] = { ...recipes[index], ...recipeData, id: parseInt(id) };
        } else { // Mode Tambah
            recipeData.id = Date.now();
            recipes.push(recipeData);
        }

        saveRecipes();
        alert('Resep berhasil disimpan!');
        window.location.href = 'index.html#resep'; // Redirect ke halaman utama
    };

    recipeForm.addEventListener('submit', handleFormSubmit);
});