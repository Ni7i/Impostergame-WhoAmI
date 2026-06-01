export const CHARACTERS = [
  // Politische Figuren - Geschichte
  'Adolf Hitler', 'Joseph Stalin', 'Benito Mussolini', 'Francisco Franco', 'Mao Zedong',
  'Pol Pot', 'Kim Il-sung', 'Fidel Castro', 'Saddam Hussein', 'Idi Amin',
  'Napoleon Bonaparte', 'Otto von Bismarck', 'Winston Churchill', 'Franklin D. Roosevelt',
  'Harry Truman', 'Dwight D. Eisenhower', 'John F. Kennedy', 'Nikita Chruschtschow',
  'Leonid Breschnew', 'Mikhail Gorbachev', 'Boris Jelzin', 'Vladimir Putin',
  'Ronald Reagan', 'Margaret Thatcher', 'Charles de Gaulle', 'Konrad Adenauer',
  'Helmut Kohl', 'Angela Merkel', 'Tony Blair', 'David Cameron', 'Boris Johnson',
  'Emmanuel Macron', 'Silvio Berlusconi', 'Pedro Sánchez', 'Antonio Costa',

  // Weitere Politiker
  'Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'Andrew Jackson',
  'Ulysses S. Grant', 'Theodore Roosevelt', 'Franklin D. Roosevelt', 'Harry Truman',
  'Dwight Eisenhower', 'John F. Kennedy', 'Lyndon B. Johnson', 'Richard Nixon',
  'Gerald Ford', 'Jimmy Carter', 'Ronald Reagan', 'George H. W. Bush',
  'Bill Clinton', 'George W. Bush', 'Barack Obama', 'Donald Trump', 'Joe Biden',
  'Indira Gandhi', 'Jawaharlal Nehru', 'Rajiv Gandhi', 'Narendra Modi',
  'Lee Kuan Yew', 'Mahathir Mohamad', 'Suharto', 'Juan Carlos I',
  'Augusto Pinochet', 'Hugo Chavez', 'Salvador Allende', 'Juan Peron',
  'Golda Meir', 'David Ben-Gurion', 'Menachem Begin', 'Yitzhak Rabin',

  // Revolutionäre & Guerilla-Kämpfer
  'Che Guevara', 'Ho Chi Minh', 'Mao Zedong', 'Deng Xiaoping',
  'Emilio Zapata', 'Pancho Villa', 'Leon Trotsky', 'Vladimir Lenin',
  'Rosa Luxemburg', 'Emma Goldman', 'Mikhail Bakunin', 'Pierre-Joseph Proudhon',

  // Wissenschaftler & Erfinder
  'Albert Einstein', 'Isaac Newton', 'Marie Curie', 'Stephen Hawking',
  'Galileo Galilei', 'Nikola Tesla', 'Thomas Edison', 'Alexander Graham Bell',
  'Louis Pasteur', 'Charles Darwin', 'Gregor Mendel', 'Albert Einstein',
  'Richard Feynman', 'Carl Sagan', 'Jane Goodall', 'Richard Dawkins',
  'Linus Pauling', 'Max Planck', 'Niels Bohr', 'Werner Heisenberg',
  'Erwin Schrödinger', 'Paul Dirac', 'John von Neumann', 'Alan Turing',

  // Künstler & Kreative
  'Leonardo da Vinci', 'Michelangelo', 'Rembrandt', 'Vincent van Gogh',
  'Pablo Picasso', 'Salvador Dalí', 'Andy Warhol', 'Jackson Pollock',
  'Frida Kahlo', 'Wassily Kandinsky', 'Joan Miró', 'Mark Rothko',
  'Roy Lichtenstein', 'Jean-Michel Basquiat', 'Banksy', 'Ai Weiwei',
  'Barbara Kruger', 'Cindy Sherman', 'Marina Abramović', 'Yoko Ono',

  // Musiker & Komponisten
  'Ludwig van Beethoven', 'Wolfgang Amadeus Mozart', 'Johann Sebastian Bach',
  'Giuseppe Verdi', 'Richard Wagner', 'Frédéric Chopin', 'Pyotr Ilyich Tchaikovsky',
  'Igor Stravinsky', 'Aaron Copland', 'George Gershwin', 'Cole Porter',
  'Jerome Kern', 'Richard Rodgers', 'Oscar Hammerstein II', 'Leonard Bernstein',
  'John Williams', 'Hans Zimmer', 'The Beatles', 'Elvis Presley',
  'Bob Dylan', 'The Rolling Stones', 'David Bowie', 'Queen',
  'Michael Jackson', 'Prince', 'Madonna', 'Beyoncé', 'Lady Gaga',
  'Metallica', 'Pink Floyd', 'Led Zeppelin', 'Nirvana', 'Eminem', 'Jay-Z',
  'Kurt Cobain', 'Jimi Hendrix', 'Janis Joplin', 'Jim Morrison',

  // Schriftsteller & Dichter
  'William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Leo Tolstoi',
  'Fyodor Dostoevsky', 'Gustave Flaubert', 'Victor Hugo', 'Alexandre Dumas',
  'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald', 'George Orwell',
  'Harper Lee', 'J.D. Salinger', 'Kurt Vonnegut', 'Joseph Heller',
  'Gabriel García Márquez', 'Isabel Allende', 'Salman Rushdie', 'Haruki Murakami',
  'Stephen King', 'J.K. Rowling', 'George R. R. Martin', 'J.R.R. Tolkien',
  'Margaret Atwood', 'Toni Morrison', 'Alice Walker', 'Chimamanda Ngozi Adichie',
  'Paulo Coelho', 'Khaled Hosseini', 'Donna Tartt', 'Ruth Ozeki',

  // Film & Theater
  'Charlie Chaplin', 'Orson Welles', 'Alfred Hitchcock', 'Stanley Kubrick',
  'Steven Spielberg', 'Martin Scorsese', 'Francis Ford Coppola', 'George Lucas',
  'James Cameron', 'Christopher Nolan', 'Quentin Tarantino', 'Spike Lee',
  'David Lynch', 'Paul Thomas Anderson', 'The Coen Brothers', 'Wes Anderson',
  'Ingmar Bergman', 'Akira Kurosawa', 'Federico Fellini', 'Michelangelo Antonioni',
  'Billy Wilder', 'Ernst Lubitsch', 'Frank Capra', 'Preston Sturges',
  'Marlon Brando', 'James Dean', 'Audrey Hepburn', 'Marilyn Monroe',
  'Cary Grant', 'Humphrey Bogart', 'Katherine Hepburn', 'Ingrid Bergman',
  'Jack Nicholson', 'Robert De Niro', 'Al Pacino', 'Denzel Washington',
  'Tom Hanks', 'Leonardo DiCaprio', 'Johnny Depp', 'Brad Pitt',
  'Meryl Streep', 'Julia Roberts', 'Sandra Bullock', 'Angelina Jolie',

  // Sportler
  'Muhammad Ali', 'Mike Tyson', 'Evander Holyfield', 'Floyd Mayweather',
  'Pelé', 'Diego Maradona', 'Cristiano Ronaldo', 'Lionel Messi',
  'Johan Cruyff', 'Franz Beckenbauer', 'Zinedine Zidane', 'Ronaldinho',
  'Michael Jordan', 'Kobe Bryant', 'LeBron James', 'Magic Johnson',
  'Larry Bird', 'Shaquille O\'Neal', 'Tim Duncan', 'Wilt Chamberlain',
  'Roger Federer', 'Rafael Nadal', 'Novak Djokovic', 'Serena Williams',
  'Venus Williams', 'Steffi Graf', 'Martina Navratilova', 'Billie Jean King',
  'Wayne Gretzky', 'Bobby Orr', 'Mario Lemieux', 'Gordie Howe',
  'Babe Ruth', 'Willie Mays', 'Joe DiMaggio', 'Ted Williams',
  'Jackie Robinson', 'Derek Jeter', 'Barry Bonds', 'Hank Aaron',
  'Mark McGwire', 'Sammy Sosa', 'Manny Ramirez', 'Alex Rodriguez',
  'Usain Bolt', 'Carl Lewis', 'Jesse Owens', 'Florence Griffith-Joyner',
  'Simone Biles', 'Nadia Comaneci', 'Olga Korbut', 'Mary Lou Retton',
  'Michael Phelps', 'Katie Ledecky', 'Mark Spitz', 'Dawn Fraser',

  // Mathematiker & Logiker
  'Euclid', 'Pythagoras', 'Archimedes', 'Gottfried Wilhelm Leibniz',
  'Isaac Newton', 'Carl Friedrich Gauss', 'Georg Cantor', 'David Hilbert',
  'Emmy Noether', 'Kurt Gödel', 'Turing', 'John von Neumann',
  'Leonhard Euler', 'Pierre-Simon Laplace', 'Carl Jacobi', 'Bernhard Riemann',

  // Philosophen
  'Platon', 'Aristoteles', 'Sokrates', 'Immanuel Kant', 'Friedrich Nietzsche',
  'Søren Kierkegaard', 'Jean-Paul Sartre', 'Simone de Beauvoir', 'Michel Foucault',
  'Jacques Derrida', 'Gilles Deleuze', 'Ludwig Wittgenstein', 'Bertrand Russell',
  'Karl Popper', 'Thomas Kuhn', 'Jürgen Habermas', 'Hannah Arendt',
  'Herbert Marcuse', 'Theodor Adorno', 'Max Horkheimer', 'Walter Benjamin',
  'Arthur Schopenhauer', 'David Hume', 'John Locke', 'René Descartes',

  // Religiöse Figuren
  'Jesus Christus', 'Muhammad', 'Buddha', 'Moses', 'Abraham',
  'Papst Franziskus', 'Martin Luther', 'John Calvin', 'Tenzin Gyatso',
  'Dalai Lama', 'Thich Nhat Hanh', 'Joan of Arc', 'Thomas Aquinas',
  'Augustine of Hippo', 'Søren Kierkegaard', 'Maimonides', 'Al-Ghazali',

  // Unternehmer & Geschäftsleute
  'Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Elon Musk',
  'Jeff Bezos', 'Larry Page', 'Sergey Brin', 'Jack Ma',
  'Warren Buffett', 'George Soros', 'Richard Branson', 'Donald Trump',
  'Oprah Winfrey', 'Martha Stewart', 'Sara Blakely', 'Mary Kay Ash',
  'Coco Chanel', 'Ralph Lauren', 'Tommy Hilfiger', 'Karl Lagerfeld',
  'Gianni Versace', 'Giorgio Armani', 'Miuccia Prada', 'Donatella Versace',
  'Henry Ford', 'John D. Rockefeller', 'Andrew Carnegie', 'JP Morgan',
  'Cornelius Vanderbilt', 'Leland Stanford', 'Collis P. Huntington',

  // Aktivisten & Reformer
  'Martin Luther King Jr.', 'Malcolm X', 'Rosa Parks', 'Nelson Mandela',
  'Desmond Tutu', 'Mahatma Gandhi', 'Jawaharlal Nehru', 'Aung San Suu Kyi',
  'Malala Yousafzai', 'Greta Thunberg', 'Gloria Steinem', 'Betty Friedan',
  'Susan B. Anthony', 'Elizabeth Cady Stanton', 'Emmeline Pankhurst',
  'Harvey Milk', 'Marsha P. Johnson', 'Bayard Rustin', 'Thurgood Marshall',
  'Ruth Bader Ginsburg', 'Cesar Chavez', 'Mother Teresa', 'Fannie Lou Hamer',
  'Harriet Tubman', 'Frederick Douglass', 'Sojourner Truth', 'John Brown',

  // Explorers & Abenteurer
  'Christopher Columbus', 'Vasco da Gama', 'Ferdinand Magellan', 'Bartolomeu Dias',
  'Marco Polo', 'Ibn Battuta', 'Zheng He', 'Sir Francis Drake',
  'Captain James Cook', 'David Livingstone', 'Henry Morton Stanley',
  'Roald Amundsen', 'Robert Falcon Scott', 'Ernest Shackleton',
  'Edmund Hillary', 'Tenzing Norgay', 'Neil Armstrong', 'Buzz Aldrin',
  'Yuri Gagarin', 'Valentina Tereshkova', 'John Glenn', 'Alan Shepard',

  // Weitere berühmte Personen
  'Cleopatra', 'Julius Caesar', 'Augustus', 'Constantine the Great',
  'Charlemagne', 'William the Conqueror', 'Richard the Lionheart', 'Joan of Arc',
  'Queen Elizabeth I', 'Henry VIII', 'Louis XIV', 'Frederick the Great',
  'Catherine the Great', 'Peter the Great', 'Ivan the Terrible',
  'Ramesses II', 'Hammurabi', 'Akbar', 'Ashoka', 'Kublai Khan',
  'Montezuma II', 'Atahualpa', 'Tecumseh', 'Crazy Horse', 'Sitting Bull',
];

export function getRandomCharacter(): string {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}
