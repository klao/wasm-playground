	.section  .note.GNU-stack, "", @progbits

	.section .text
	.globl fib
	.type fib, @function
fib:
	cmpl $1, %edi
	jg rec
	mov %edi, %eax
	cltq
	ret
rec:
	sub $1, %edi
	push %rdi
	call fib
	pop %rdi
	push %rax
	sub $1, %edi
	call fib
	pop %rdi
	add %rdi, %rax
	ret
