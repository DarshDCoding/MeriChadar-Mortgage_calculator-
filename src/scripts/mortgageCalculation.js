export default function mortgagePayments(amount, term, rate){
    const principal = amount;
    const monthlyRate = rate/100/12;
    const numberOfPayments= term*12;

    const repayment = (principal * monthlyRate * Math.pow(1+monthlyRate, numberOfPayments))/ (Math.pow(1+monthlyRate, numberOfPayments)-1);

    const intrestOnly = principal*monthlyRate;

    const repayOverTerm = repayment * numberOfPayments;

    return {
        repayment:repayment,
        intrestOnly:intrestOnly,
        repayOverTerm:repayOverTerm
    };
}

//test
// console.log(mortgagePayments(300000,25,5.25))
/* output: {
  repayment: 1797.7431455138237,
  intrestOnly: 1312.4999999999998,
  repayOverTerm: 539322.9436541471
}*/
