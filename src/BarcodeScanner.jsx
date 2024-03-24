import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

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
                Quagga.onDetected((data) => {
                    console.log(data)
                    barcodeResultRef.current.value = data.codeResult.code;
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