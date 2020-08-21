import React, { useEffect, useState } from 'react';
import BioSection from '../../components/BioSection';
import ImageSection from '../../components/ImageSection';
import { fetchBoardData } from '../../fuctions/fetchData';
import { Button, Form, Carousel } from 'react-bootstrap';
import styles from './Board.module.scss';

const UpdateBoard = () => {
  const [board, setBoard] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');

  const fileSelectHandler = (file) => {
    setSelectedFile(file);
  };
  const fileUploadHandler = (srcUrl) => {
    console.log(srcUrl);
  };

  const submitChanges = (e) => {
    console.log(e);
  };

  const fetchBoard = async () => {
    const boardArray = await fetchBoardData();
    setBoard(board.concat(boardArray));
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  return (
    <div className={styles.updateBoard}>
      <Carousel interval={null}>
        {board.map((e, index) => {
          return (
            <Carousel.Item key={`${e.name}${index}`}>
              <div className={styles.mainInputArea}>
                <h2>{e.name}</h2>
                <Form onSubmit={() => submitChanges(e.id)}>
                  <ImageSection
                    id={e.id}
                    initialUrl={e.imageUrl}
                    selectedFile={selectedFile}
                    fileSelectHandler={(file) => fileSelectHandler(file)}
                    fileUploadHandler={fileUploadHandler}
                  />
                  <BioSection
                    name={e.name}
                    titleEng={e.titleEng}
                    titleEsp={e.titleEsp}
                    bioEng={e.bioEng}
                    bioEsp={e.bioEsp}
                    displayOrder={e.displayOrder}
                    memberNum={board.length}
                  />

                  <Button
                    type="submit"
                    style={{ margin: '2rem 0' }}
                    value={e.id}
                  >
                    Submit Changes
                  </Button>
                </Form>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default UpdateBoard;
