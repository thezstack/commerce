import type { Product } from 'lib/shopify/types';

const gradeLabels = [
  'kindergarten',
  'first grade',
  'second grade',
  'third grade',
  'fourth grade',
  'fifth grade',
  'sixth grade',
  'seventh grade',
  'eighth grade'
];

function titleCase(value: string) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getProductContext(product: Product) {
  const normalizedTitle = product.title.toLowerCase();
  const normalizedHandle = product.handle.replace(/-/g, ' ');
  const grade =
    gradeLabels.find((label) => normalizedTitle.includes(label)) ||
    gradeLabels.find((label) => normalizedHandle.includes(label));
  const schoolFromHandle = grade
    ? normalizedHandle
        .replace(grade, '')
        .replace(/\bschool kit\b/g, '')
        .replace(/\s+/g, ' ')
        .trim()
    : '';
  const schoolName = product.collection || (schoolFromHandle ? titleCase(schoolFromHandle) : '');
  const gradeLabel = grade ? titleCase(grade) : product.title.replace(/ School Kit$/i, '');
  const productTitle = `${gradeLabel} School Kit`;

  return {
    gradeLabel,
    productTitle,
    schoolName
  };
}

export function getProductSeo(product: Product) {
  const { gradeLabel, productTitle, schoolName } = getProductContext(product);
  const title = schoolName ? `${schoolName} ${productTitle}` : productTitle;
  const description = schoolName
    ? `Order the ${gradeLabel.toLowerCase()} school supply kit for ${schoolName}.`
    : product.description || `Order the ${productTitle}.`;

  return {
    description,
    title
  };
}
