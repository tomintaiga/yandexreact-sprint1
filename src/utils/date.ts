/**
 * Форматирует дату в относительный формат:
 * - Сегодня, HH:mm
 * - Вчера, HH:mm
 * - N дней назад
 *
 * @param dateString Строка с датой в формате ISO 8601 (2025-04-05T12:05:40.677Z)
 * @returns Форматированная строка
 *
 *  TODO: Добавить тестов
 */
function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  // Убираем время для сравнения дат
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const inputDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  // Форматируем время всегда в HH:mm
  const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const timeString = timeFormatter.format(date);

  // Сравниваем даты
  if (inputDate.getTime() === today.getTime()) {
    return `Сегодня, ${timeString}`;
  }

  if (inputDate.getTime() === yesterday.getTime()) {
    return `Вчера, ${timeString}`;
  }

  // Для более старых дат
  const diffDays = Math.floor(
    (today.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays <= 0) {
    // На случай если дата в будущем (не должно быть по логике)
    return timeString;
  }

  return `${diffDays} ${getDayText(diffDays)} назад`;
}

/**
 * Склоняет слово "день" в зависимости от числа
 */
function getDayText(days: number): string {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'дней';
  }

  switch (lastDigit) {
    case 1:
      return 'день';
    case 2:
    case 3:
    case 4:
      return 'дня';
    default:
      return 'дней';
  }
}

export { formatRelativeDate };
