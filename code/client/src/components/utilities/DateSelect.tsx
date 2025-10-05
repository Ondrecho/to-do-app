import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const DateSelect = ({value, setValue, label}) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker sx={{width: 200}} value={dayjs(value)} onChange={(v) => setValue(v)} label={label} />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default DateSelect
