export class DateUtil {

  // MMM/MMMM D FullDay
  formatDate(dtime): string {
    const dateString = dtime.replace(/t.*/, '');
    // console.log(dateString);

    const dt = new Date(dateString);
    // console.log(dt.toString());

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = dt.getDate();
    const monthInd = dt.getMonth();
    const month = months[monthInd];
    const dayInd = dt.getDay();
    const day = days[dayInd];

    // console.log(month+" "+date+", "+day);
    return month + ' ' + date + ', ' + day;
  }

}
