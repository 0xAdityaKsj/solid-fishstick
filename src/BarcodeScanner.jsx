import React, { useEffect, useRef } from 'react';
import Quagga from '@ericblade/quagga2'; // ES6


const BarcodeScanner = () => {
    const scannerContainerRef = useRef(null);
    const barcodeResultRef = useRef(null);

    useEffect(() => {
        const initializeScanner = () => {
            Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: scannerContainerRef.current,
                    constraints: {
                        facingMode: "environment"
                    }
                },
                decoder: {
                    readers: ["code_128_reader"]
                }
            }, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                Quagga.start();
                Quagga.onDetected(function (data) {

                    console.log(`bar code data : ${data}`)

                    const barcode = data.codeResult.code;

                    // Make a request to the Open Food Facts API to retrieve product information based on the barcode
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
                });

            });
        };

        initializeScanner();
    }, []);

    return (
        <div>
            <div ref={scannerContainerRef} style={{ width: '100%', height: '300px' }} />
            <div>
                <label>Barcode Result:</label>
                <input type="text" ref={barcodeResultRef} disabled />
            </div>
        </div>
    );
};

export default BarcodeScanner;