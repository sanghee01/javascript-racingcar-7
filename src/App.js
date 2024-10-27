import { Console, Random } from '@woowacourse/mission-utils';

class App {
  async run() {
    let participantInput = await Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
    );

    if (!participantInput.includes(',')) {
      throw new Error('[ERROR] 참가자는 두명 이상이어야합니다.');
    }

    if (participantInput[0] === ',' || participantInput.at(-1) === ',') {
      throw new Error('[ERROR] 쉼표(,)는 맨 앞, 혹은 맨 뒤에 올 수 없습니다.');
    }

    participantInput.split('').forEach((x) => {
      if (
        !(
          (x.charCodeAt() >= 48 && x.charCodeAt() <= 57) ||
          (x.charCodeAt() >= 65 && x.charCodeAt() <= 90) ||
          (x.charCodeAt() >= 97 && x.charCodeAt() <= 122) ||
          x.charCodeAt() === 44
        )
      ) {
        throw new Error(
          '[ERROR] 경주할 자동차 이름 입력 시 숫자, 영어, 쉼표 이외의 문자는 입력할 수 없습니다.',
        );
      }
    });

    const participantList = participantInput.split(',');

    if (participantList.length !== new Set(participantList).size) {
      throw new Error('[ERROR] 자동차 이름은 중복될 수 없습니다.');
    }

    participantList.forEach((participant) => {
      if (participant.length > 5) {
        throw new Error('[ERROR] 자동차 이름은 5자 이하이어야 합니다.');
      }
    });

    let tryCountInput =
      await Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');

    tryCountInput = Number(tryCountInput);

    if (!Number.isInteger(tryCountInput) || !tryCountInput)
      throw new Error('[ERROR] 시도할 횟수는 자연수만 입력해야 합니다.');

    const participantListMap = new Map();
    participantList.forEach((participant) => {
      participantListMap.set(participant, '');
    });

    Console.print('\n실행 결과');
    let randomNumber = 0;

    for (let i = 0; i < tryCountInput; i++) {
      for (let participant of participantListMap) {
        randomNumber = Random.pickNumberInRange(0, 9);

        if (randomNumber >= 4) {
          participantListMap.set(
            participant[0],
            participantListMap.get(participant[0]) + '-',
          );
        }
        Console.print(
          `${participant[0]} : ${participantListMap.get(participant[0])}`,
        );
      }
      Console.print('');
    }
    let maxCount = 0;
    for (let participant of participantListMap) {
      if (participant[1].length > maxCount) maxCount = participant[1].length;
    }

    let winner = [];
    for (let participant of participantListMap) {
      if (participant[1].length === maxCount) {
        winner.push(participant[0]);
      }
    }

    Console.print(`\n최종 우승자 : ${winner.join(', ')}`);
  }
}

export default App;
