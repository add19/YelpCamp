package main
 
 import "fmt"
// import "math"
 // for small prime
 func isPrime(num int) bool {
         for i := 2; i < num; i++ {
                 if num%i == 0 {
                         return false
                 }
         }
         return true
 }

 func main() {

         fmt.Println("Is 5 a prime number? : ", isPrime(5))
         fmt.Println("Is 6 a prime number? : ", isPrime(6))
        
 }
