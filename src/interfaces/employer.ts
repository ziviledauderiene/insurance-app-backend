export default interface IEmployer extends Document{
  id: string;
  name: string;
  code: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  logo?: string;
}
