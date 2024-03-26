import { useEffect } from 'react';

export default function Test({ barcode = '737628064502' }) { // Example barcode as default prop

    useEffect(() => {
        fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
            .then(response => response.json())
            .then(productData => {
                // Use JSON.stringify for better object visibility in the console
                console.log('product data:', JSON.stringify(productData, null, 2));

                // Check if the product exists and has nutriments data
                if (productData.status === 1 && productData.product.nutriments) {
                    // Extract calorie information or other relevant data from the response
                    const calorieData = productData.product.nutriments.energy_value;
                    // Display the calorie data to the user
                    console.log("Calorie data:", calorieData);
                } else {
                    console.log("Product not found or doesn't have nutriments data");
                }
            })
            .catch(error => {
                console.error("Error fetching product data:", error);
            });
    }, [barcode]); // Depend on barcode prop to re-fetch if it changes

    return (
        <div>
            Check the console for product data.
        </div>
    );
}
