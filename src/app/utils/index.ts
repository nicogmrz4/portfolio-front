import { Subject } from 'rxjs';

export function fileToDataURL(file: File) {
  let fileToDataURL$ = new Subject<string>();
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    if (reader.result != null) {
      fileToDataURL$.next(reader.result?.toString());
      fileToDataURL$.complete();
    }
    fileToDataURL$.error('An error has ben ocurred and can\'t convert the file to URL');
    fileToDataURL$.complete();
  };

  return fileToDataURL$.asObservable();
}
