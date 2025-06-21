/**
 * Validates a Brazilian CPF (Cadastro de Pessoas Físicas) number.
 *
 * A CPF is considered valid if it has 11 digits, does not consist of all identical digits,
 * and passes the two check digit verifications according to the official algorithm (https://www.macoratti.net/alg_cpf.htm#:~:text=O%20algoritmo%20de%20valida%C3%A7%C3%A3o%20do,%3A%20111.444.777%2D05.).
 *
 * @param cpf - The CPF number as a string containing only digits.
 * @returns `true` if the CPF is valid, otherwise `false`.
 */
export const isValidCPF = (cpf: string): boolean => {
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  const cpfDigits = cpf.split("").map((el) => +el);
  const rest = (count: number): number => {
    return (
      ((cpfDigits
        .slice(0, count - 12)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
      10
    );
  };
  return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
};
