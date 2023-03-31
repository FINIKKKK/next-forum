import moment from 'moment';
import 'moment/locale/ru';
import React from 'react';

export const useTimeNow = (date: string) => {
  const [formattedDate, setFormattedDate] = React.useState('');

  React.useEffect(() => {
    const dateString = moment(date).locale('ru');
    setFormattedDate(dateString.fromNow());
  }, [date]);

  return formattedDate;
};
