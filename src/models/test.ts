import mongoose from 'mongoose';

interface ITest {
  title: string;
  description: string;
}

interface testModelInterface extends mongoose.Model<TestDoc> {
  build(atrr: ITest): TestDoc;
}

interface TestDoc extends mongoose.Document {
  title: string;
  description: string;
}

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

testSchema.statics.build = (attr: ITest) => {
  return new Test(attr);
};

const Test = mongoose.model<TestDoc, testModelInterface>('Test', testSchema);

Test.build({
  title: 'test title',
  description: 'some description',
});

export { Test }