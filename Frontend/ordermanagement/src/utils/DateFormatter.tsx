import * as dateFns from 'date-fns';
import * as Constants from '../types/Constants';

export const formatDate = (date: Date | null): string => {
    if (!date) {
        return dateFns.format(new Date(), Constants.DATE_FORMAT);
    }

    return dateFns.format(new Date(date), Constants.DATE_FORMAT);
};

export const formatTime = (date: Date | null): string => {
    if (!date) {
        return dateFns.format(new Date(), Constants.TIME_FORMAT);
    }

    return dateFns.format(date, Constants.TIME_FORMAT);
};

export const formatDatePicker = (date: Date | null): string => {
    if (!date) {
        return dateFns.format(new Date(), Constants.DATE_FORMAT_DATE_PICKER);
    }

    return  dateFns.format(new Date(date), Constants.DATE_FORMAT_DATE_PICKER);
}

