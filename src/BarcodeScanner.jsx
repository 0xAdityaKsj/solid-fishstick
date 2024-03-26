import React, { useEffect, useRef, useState } from 'react';
import Quagga from '@ericblade/quagga2'; // ES6

const BarcodeScanner = () => {
    const scannerContainerRef = useRef(null);
    const barcodeResultRef = useRef(null);
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [productInfo, setProductInfo] = useState(null); // State to store fetched product information

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
                Quagga.onDetected(onDetected);
            });
        };

        const onDetected = (data) => {
            Quagga.offDetected(onDetected); // Remove the event listener to prevent multiple detections
            Quagga.stop(); // Stop Quagga after detecting a barcode

            const barcode = data.codeResult.code;
            console.log(`Barcode data: ${barcode}`);
            fetchProductData(barcode);
        };

        const fetchProductData = (barcode) => {
            setLoading(true); // Indicate loading state
            fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
                .then(response => response.json())
                .then(productData => {
                    setLoading(false); // Reset loading state
                    console.log('Product data:', JSON.stringify(productData, null, 2));
                    if (productData.status === 1 && productData.product.nutriments) {
                        setProductInfo(productData.product); // Store product information in state
                    } else {
                        console.log("Product not found or doesn't have nutriments data");
                    }
                })
                .catch(error => {
                    setLoading(false); // Reset loading state
                    console.error("Error fetching product data:", error);
                });
        };

        initializeScanner();

        // Cleanup function to stop Quagga when the component unmounts
        return () => {
            Quagga.stop();
        };
    }, []);

    return (
        <div>
            <div ref={scannerContainerRef} style={{ width: '100%', height: '300px' }} />
            <div>
                <label>Barcode Result:</label>
                <input type="text" ref={barcodeResultRef} value={productInfo ? productInfo.product_name : ''} disabled />
            </div>
            {loading && <p>Loading product information...</p>}
            {productInfo && <div>
                <p>Product Name: {productInfo.product_name}</p>
                {/* Display more product information as needed */}
            </div>}
        </div>
    );
};

export default BarcodeScanner;