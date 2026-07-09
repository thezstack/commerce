import { redirect } from 'next/navigation';

export default function UndefinedPathRedirect() {
  redirect('/schools');
}
