//this function help for story cards to cut the text for shorter description

export default function truncate(str, no_words) {
  return str.split(" ").splice(0,no_words).join(" ");
}
