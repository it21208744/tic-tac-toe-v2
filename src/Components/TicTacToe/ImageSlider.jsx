import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = () => {
  const [movesCount, setMovesCount] = useState(0);
  const [imagesArr, setImagesArr] = useState([]);
  const [gridGenerated, setGridGenerated] = useState(false);

  const isTouchDevice = () => {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  };

  const randomNumber = () => Math.floor(Math.random() * 8) + 1;

  const getCoords = (element) => {
    const position = element.getAttribute('data-position');
    if (!position) return [null, null];
    const [row, col] = position.split('_');
    return [parseInt(row), parseInt(col)];
  };

  const checkAdjacent = (row1, row2, col1, col2) => {
    if (row1 === row2) {
      return col2 === col1 - 1 || col2 === col1 + 1;
    } else if (col1 === col2) {
      return row2 === row1 - 1 || row2 === row1 + 1;
    }
    return false;
  };

  const randomImages = () => {
    let tempArr = [];
    while (tempArr.length < 8) {
      let randomVal = randomNumber();
      if (!tempArr.includes(randomVal)) {
        tempArr.push(randomVal);
      }
    }
    tempArr.push(9); // Push the empty tile
    setImagesArr(tempArr);
  };

  const gridGenerator = () => {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    let count = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let div = document.createElement('div');
        div.setAttribute('data-position', `${i}_${j}`);
        div.classList.add('image-container');
        div.innerHTML = `<img src="${process.env.PUBLIC_URL}/images/image_part_0${
          imagesArr[count] < 10 ? '0' : ''
        }${imagesArr[count]}.png" class="image ${imagesArr[count] === 9 ? 'target' : ''}" data-index="${
          imagesArr[count]
        }" />`;
        container.appendChild(div);
        count++;
      }
    }
    setGridGenerated(true);
  };

  const selectImage = (e) => {
    e.preventDefault();

    const clickedElement = e.target.closest('.image');
    if (!clickedElement) return;

    const targetElement = document.querySelector('.target');
    const currentParent = clickedElement.parentElement;
    const targetParent = targetElement.parentElement;

    const [row1, col1] = getCoords(currentParent);
    const [row2, col2] = getCoords(targetParent);

    if (checkAdjacent(row1, row2, col1, col2)) {
      const currentIndex = parseInt(clickedElement.getAttribute('data-index'));
      const targetIndex = parseInt(targetElement.getAttribute('data-index'));

      // Swap the images in DOM
      clickedElement.remove();
      targetElement.remove();

      clickedElement.setAttribute('data-index', targetIndex);
      targetElement.setAttribute('data-index', currentIndex);

      currentParent.appendChild(targetElement);
      targetParent.appendChild(clickedElement);

      // Update the image array
      let tempImagesArr = [...imagesArr];
      let currentArrIndex = tempImagesArr.indexOf(currentIndex);
      let targetArrIndex = tempImagesArr.indexOf(targetIndex);

      [tempImagesArr[currentArrIndex], tempImagesArr[targetArrIndex]] = [
        tempImagesArr[targetArrIndex],
        tempImagesArr[currentArrIndex],
      ];

      setImagesArr(tempImagesArr);
      setMovesCount((prev) => prev + 1);

      if (tempImagesArr.join('') === '123456789') {
        setTimeout(() => {
          document.querySelector('.cover-screen').classList.remove('hide');
          document.querySelector('.container').classList.add('hide');
          document.getElementById('result').innerText = `Total Moves: ${movesCount}`;
          document.getElementById('start-button').innerText = 'Restart Game';
        }, 1000);
      }
    }
  };

  const startGame = () => {
    document.querySelector('.container').classList.remove('hide');
    document.querySelector('.cover-screen').classList.add('hide');
    randomImages();
    setMovesCount(0);
  };

  useEffect(() => {
    if (!gridGenerated && imagesArr.length > 0) {
      gridGenerator();
    }
  }, [imagesArr]);

  return (
    <div className="slider-game">
      <div className="cover-screen">
        <p id="result"></p>
        <button id="start-button" onClick={startGame}>Start Game</button>
      </div>
      <div id="moves">Moves: {movesCount}</div>
      <div className="container" onClick={selectImage}></div>
    </div>
  );
};

export default ImageSlider;
