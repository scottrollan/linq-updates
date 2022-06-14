import React, { useEffect, useState } from 'react';
import BioSection from '../../components/BioSection';
import ImageSection from '../../components/ImageSection';
import CheckErrors from '../../popups/CheckErrors';
import Thinking from '../../popups/Thinking';
import ActionComplete from '../../popups/ActionComplete';
import { Client } from '../../api/client';
import { fetchBoardData } from '../../fuctions/fetchData';
import $ from 'jquery';
import { normalizeBlock } from '@sanity/block-tools';
import { Button, Form, Carousel } from 'react-bootstrap';
import styles from './Board.module.scss';

const UpdateBoard = () => {
  const [board, setBoard] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const fileSelectHandler = (file) => {
    setSelectedFile(file);
  };

  const checkErrors = (id) => {
    console.log(id);
    switch (true) {
      case !$(`#name${id}`).val():
        setErrorMessage(<p>You must enter a name.</p>);
        openErrorPopup(id);
        break;
      case !$(`#titleEng${id}`).val() || !$(`#titleEsp${id}`).val():
        setErrorMessage(
          <p>
            You must enter a title in English <i>and</i> in Spanish.
          </p>
        );
        openErrorPopup(id);
        break;
      case !$(`#bioEng${id}`).val() || !$(`#bioEsp${id}`).val():
        setErrorMessage(
          <p>
            You must enter a bio in English <i>and</i> in Spanish.
          </p>
        );
        openErrorPopup(id);
        break;
      default:
        prepareAndSubmitForm(id);
        break;
    }
  };

  const openErrorPopup = (id) => {
    $(`#checkErrors${id}`).css('display', 'flex');
  };

  const prepareAndSubmitForm = async (id) => {
    $(`#thinking${id}`).css('display', 'flex');
    let form = {};
    const preparedImageObj = {
      _type: 'image',
      asset: { _ref: $(`#image${id}`).val(), _type: 'reference' },
    };
    const bioEngBlurb = $(`#bioEng${id}`).val().split('\n');
    const bioEspBlurb = $(`#bioEsp${id}`).val().split('\n');
    let bioEngArray = [];
    let bioEspArray = [];

    bioEngBlurb.forEach((pp) => {
      const partialBlock = {
        _type: 'block',
        children: [{ _type: 'span', marks: [], text: pp }],
      };
      const pushThis = normalizeBlock(partialBlock);
      bioEngArray.push(pushThis);
    });

    bioEspBlurb.forEach((pp) => {
      const partialBlock = {
        _type: 'block',
        children: [{ _type: 'span', marks: [], text: pp }],
      };
      const pushThis = normalizeBlock(partialBlock);
      bioEspArray.push(pushThis);
    });

    form = {
      _id: id,
      _type: 'board',
      memberImage: { ...preparedImageObj },
      name: $(`#name${id}`).val(),
      displayOrder: parseInt($(`#displayOrder${id}`).val()),
      titleEng: $(`#titleEng${id}`).val().trim(),
      titleEsp: $(`#titleEsp${id}`).val().trim(),
      bioEng: [...bioEngArray],
      bioEsp: [...bioEspArray],
    };
    const now = new Date();
    const preUpdate = Date.parse(now);
    let response = await Client.createOrReplace(form).catch((err) => {
      alert('Oh no, the update failed: ', err.message);
      return;
    });

    const updatedAt = Date.parse(response._updatedAt);
    if (updatedAt >= preUpdate) {
      $(`#thinking${id}`).css('display', 'none');
      $(`#success${id}`).css('display', 'flex');
    }
  };

  useEffect(() => {
    const fetchBoard = async () => {
      const boardArray = await fetchBoardData();
      setBoard(board.concat(boardArray));
    };
    fetchBoard();
  }, []);

  return (
    <div className={styles.updateBoard}>
      <Carousel interval={null}>
        {board.map((e, index) => {
          return (
            <Carousel.Item key={`${e.name}${index}`}>
              <CheckErrors
                id={e.id}
                message={errorMessage}
                goTo={`#mainInputArea${e.id}`}
              />
              <ActionComplete
                what={`${e.name} (${e.titleEsp})`}
                titleEsp={e.titleEsp}
                action="edited"
                id={`success${e.id}`}
              />
              <Thinking id={`thinking${e.id}`} />
              <div className={styles.mainInputArea}>
                <h2>{e.name}</h2>
                <Form id={`mainInputArea${e.id}`}>
                  <ImageSection
                    id={e.id}
                    image={e.image}
                    initialUrl={e.imageUrl}
                    selectedFile={selectedFile}
                    fileSelectHandler={(file) => fileSelectHandler(file)}
                  />
                  <BioSection
                    id={e.id}
                    name={e.name}
                    titleEng={e.titleEng}
                    titleEsp={e.titleEsp}
                    bioEng={e.bioEng}
                    bioEsp={e.bioEsp}
                    displayOrder={e.displayOrder}
                    memberNum={board.length}
                  />

                  <Button
                    onClick={() => checkErrors(e.id)}
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
