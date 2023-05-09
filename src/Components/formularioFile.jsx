import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

export function FormFile({files, setFiles}) {
    

    const onDrop = (acceptedFiles) => {
        setFiles(acceptedFiles);
    };

    useEffect(()=>{
        let archivos = "";
        files.map(item => {archivos+="segun es "+item.name})
        console.log("Archivos",archivos)
    },[files]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="text-center p-5">
                        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>Suelta los archivos aquí...</p>
                            ) : (
                                <p>Arrastra y suelta los archivos aquí o haz clic para seleccionarlos</p>
                            )}
                        </div>
                        {files.length > 0 && (
                            <div>
                                <h5>Archivos seleccionados:</h5>
                                <ul>
                                    {files.map((file) => (
                                        <li key={file.name}>{file.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}