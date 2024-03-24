import React, { useState } from 'react';

const TdeeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [tdee, setTdee] = useState(null);

  const calculateTdee = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseFloat(age);

    let bmr;

    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    let activityMultiplier;

    switch (activityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'lightlyActive':
        activityMultiplier = 1.375;
        break;
      case 'moderatelyActive':
        activityMultiplier = 1.55;
        break;
      case 'veryActive':
        activityMultiplier = 1.725;
        break;
      case 'extraActive':
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
    }

    const tdeeValue = bmr * activityMultiplier;
    setTdee(tdeeValue.toFixed(2));
  };

  return (
    <div>
      <h1>TDEE Calculator</h1>
      <div>
        <label>Weight (kg):</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>
      <div>
        <label>Height (cm):</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>
      <div>
        <label>Age (years):</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div>
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label>Activity Level:</label>
        <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
          <option value="sedentary">Sedentary</option>
          <option value="lightlyActive">Lightly Active</option>
          <option value="moderatelyActive">Moderately Active</option>
          <option value="veryActive">Very Active</option>
          <option value="extraActive">Extra Active</option>
        </select>
      </div>
      <button onClick={calculateTdee}>Calculate TDEE</button>
      {tdee && <p>Your Total Daily Energy Expenditure (TDEE) is: {tdee} calories</p>}
    </div>
  );
};

export default TdeeCalculator;
