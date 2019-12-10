// package main
 
// import "fmt"

//  func isPrime(num int) bool {
//          for i := 2; i < num; i++ {
//                  if num%i == 0 {
//                          return false
//                  }
//          }
//          return true
//  }

 
// func main(){
//     var n int
//     t1:=0
//     t2:=1
//     nextTerm:=0
     
//     fmt.Print("Enter the number of terms : ")
//     fmt.Scan(&n)
//     fmt.Print("Fibonacci Series :")
//     for i:=1;i<=n;i++ {
//         if(i==1){
//             fmt.Print(" ",t1)
//             continue
//         }
//         if(i==2){
//             fmt.Print(" ",t2)
//             continue
//         }
//         nextTerm = t1 + t2
//         t1=t2
//         t2=nextTerm
      
//     }
//       fmt.Print(" ",nextTerm)
//         fmt.Println("Is it a prime number? : ", isPrime(nextTerm))
// }
package main

import "fmt"

func isPrime(num int) bool{
    for i := 2; i < num; i++{
        if num % i == 0 {
            return false
        }
    }
    return true
}

func main(){
    var n int
    t1 := 0
    t2 := 1
    nextTerm := 0
    fmt.Println("Enter the nth number of Fibonacci sequence: ")
    fmt.Scanln(&n)

    for i:=0; i<=n; i++{
        if i == 1{
            fmt.Println("t1: ", t1)
            continue
        }else if i == 2{
            fmt.Println("t2: ", t2)
            continue
        }
        nextTerm = t1 + t2
        t1 = t2
        t2 = nextTerm
    }
    fmt.Println(nextTerm)
    fmt.Println("Is it a prime number? ", isPrime(nextTerm))
}
