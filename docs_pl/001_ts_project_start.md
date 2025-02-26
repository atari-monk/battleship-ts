# Jak szybko rozpocząć projekt TypeScript

Do prostego projektu TypeScript, w którym chcę mieć bibliotekę z kodem, testami i klientem, aby przetestować go w konsoli przeglądarki.

## [Źródło](https://pllum.clarin-pl.eu/pllum_8x7b)

Aby szybko rozpocząć projekt TypeScript, możesz wykonać następujące kroki:

1. **Utwórz strukturę projektu**:
   - Utwórz folder dla projektu.
   - W folderze projektu utwórz podfoldery:
     - lib: dla plików biblioteki.
     - test: dla plików testów.
     - client: dla plików klienta.

2. **Zainstaluj TypeScript**:
   - Użyj menedżera pakietów (np. npm, yarn) do zainstalowania TypeScript:
     - npm install typescript

3. **Skonfiguruj TypeScript**:
   - Utwórz plik konfiguracyjny tsconfig.json w folderze projektu.
   - W pliku tsconfig.json ustaw opcje konfiguracyjne, takie jak:
     - "compilerOptions":
       - "target": "es6"
       - "module": "commonjs"
       - "strict": true
     - "include":
       - "**.ts"

4. **Utwórz pliki biblioteki**:
   - W folderze lib utwórz pliki z rozszerzeniem .ts, które będą zawierać kod biblioteki.

5. **Utwórz pliki testów**:
   - W folderze test utwórz pliki z rozszerzeniem .ts, które będą zawierać testy jednostkowe dla biblioteki.

6. **Utwórz pliki klienta**:
   - W folderze client utwórz pliki z rozszerzeniem .ts, które będą zawierać kod klienta do testowania biblioteki w przeglądarce.

7. **Skompiluj bibliotekę**:
   - Użyj polecenia tsc do skompilowania biblioteki:
     - npm run build

8. **Uruchom testy**:
   - Użyj polecenia npm test do uruchomienia testów jednostkowych:
     - npm test

9. **Uruchom klienta**:
   - Użyj polecenia npm start do uruchomienia klienta w przeglądarce:
     - npm start

10. **Dodaj zależności**:
    - Jeśli potrzebujesz dodatkowych bibliotek, zainstaluj je za pomocą menedżera pakietów i dodaj je do pliku tsconfig.json w sekcji "compilerOptions.paths".

11. **Dodaj narzędzia**:
    - Jeśli chcesz używać narzędzi takich jak lintery (np. ESLint) lub narzędzia do testowania (np. Jest), zainstaluj je i skonfiguruj zgodnie z dokumentacją.

12. **Dodaj automatyzację**:
    - Jeśli chcesz automatyzować proces budowania i testowania, możesz użyć narzędzi takich jak Gulp, Grunt lub Webpack.

13. **Dodaj dokumentację**:
    - Jeśli chcesz, możesz utworzyć pliki z dokumentacją w folderze docs i dodać je do pliku tsconfig.json w sekcji "compilerOptions.outDir".

14. **Dodaj testy integracyjne**:
    - Jeśli chcesz, możesz utworzyć pliki z testami integracyjnymi w folderze integration-tests i dodać je do pliku tsconfig.json w sekcji "compilerOptions.outDir".

15. **Dodaj testy e2e**:
    - Jeśli chcesz, możesz utworzyć pliki z testami e2e w folderze e2e-tests i dodać je do pliku tsconfig.json w sekcji "compilerOptions.outDir".

16. **Dodaj testy wydajnościowe**:
    - Jeśli chcesz, możesz utworzyć pliki z testami wydajnościowymi w folderze performance-tests i dodać je do pliku tsconfig.json w sekcji "compiler
