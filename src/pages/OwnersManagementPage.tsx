import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { toast } from "../components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { User, Mail, Lock, Home, Phone, CreditCard, Search, MoreHorizontal, Pencil, Trash2, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { OwnerDetailsDialog } from "../components/OwnerDetailsDialog"

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is mandatory" }),
  username: z.string().min(5, { message: "Username must be at least 5 characters" }).max(50, { message: "Username must be at most 50 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  address: z.string().min(1, { message: "Address is mandatory" }),
  phone: z.string().min(1, { message: "Phone number is mandatory" }),
  nrc: z.string().min(1, { message: "NRC is mandatory" }),
})

type FormValues = z.infer<typeof formSchema>

// Updated mock data to include usernames
const mockOwners = [
  { id: 1, name: "User 1", username: "user1", email: "user1@openecommerce.com", phone: "+1234567890", address: "123 Main St, City, Country", nrc: "1234567890" },
  { id: 2, name: "User 2", username: "user2", email: "user2@openecommerce.com", phone: "+0987654321", address: "456 Elm St, Town, Country", nrc: "0987654321" },
  { id: 3, name: "User 3", username: "user3", email: "user3@openecommerce.com", phone: "+1122334455", address: "789 Oak St, Village, Country", nrc: "1122334455" }
]

export function OwnersManagementPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [owners, setOwners] = useState(mockOwners)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOwner, setSelectedOwner] = useState<typeof mockOwners[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      nrc: "",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    console.log(data)
    toast({
      title: "Owner added successfully",
      description: `${data.name} has been added as a new owner.`,
    })
    form.reset()
  }

  const filteredOwners = owners.filter(owner =>
    owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.phone.includes(searchTerm)
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentOwners = filteredOwners.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Edit owner with id: ${id}`)
  }

  const handleDelete = (id: number) => {
    setOwners(owners.filter(owner => owner.id !== id))
    toast({
      title: "Owner deleted",
      description: "The owner has been removed from the system.",
    })
  }

  const handleViewDetails = (owner: typeof mockOwners[0]) => {
    setSelectedOwner(owner)
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Owners Management</h1>
      <Tabs defaultValue="manage-owners" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="add-owner">Add New Owner</TabsTrigger>
          <TabsTrigger value="manage-owners">Manage Owners</TabsTrigger>
        </TabsList>
        <TabsContent value="add-owner">
          <Card>
            <CardHeader>
              <CardTitle>Add New Owner</CardTitle>
              <CardDescription>Fill in the details to add a new store owner.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input placeholder="Open E-Commerce" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input placeholder="oec1" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>Must be between 5 and 50 characters.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input type="email" placeholder="admin@openecommerce.com" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input type="password" placeholder="********" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>Must be at least 8 characters long.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input placeholder="123 U Wizara St, Yangon, Myanamr" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input type="tel" placeholder="+1234567890" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nrc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NRC</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input placeholder="NRC Number" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Owner"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="manage-owners">
          <Card>
            <CardHeader>
              <CardTitle>Manage Owners</CardTitle>
              <CardDescription>View and manage existing store owners.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search owners..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead className="min-w-[100px]">Username</TableHead>
                        <TableHead className="min-w-[150px]">Email</TableHead>
                        <TableHead className="min-w-[100px]">Phone</TableHead>
                        <TableHead className="w-[100px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOwners.map((owner) => (
                        <TableRow key={owner.id}>
                          <TableCell className="font-medium">{owner.name}</TableCell>
                          <TableCell>{owner.username}</TableCell>
                          <TableCell>{owner.email}</TableCell>
                          <TableCell>{owner.phone}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleViewDetails(owner)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEdit(owner.id)}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleDelete(owner.id)} className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-4 space-y-4 sm:space-y-0">
                <p className="text-sm text-muted-foreground">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOwners.length)} of {filteredOwners.length} entries
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: Math.ceil(filteredOwners.length / itemsPerPage) }, (_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(i + 1)}
                      className="hidden sm:inline-flex"
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredOwners.length / itemsPerPage)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(Math.ceil(filteredOwners.length / itemsPerPage))}
                    disabled={currentPage === Math.ceil(filteredOwners.length / itemsPerPage)}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {selectedOwner && (
        <OwnerDetailsDialog
          owner={selectedOwner}
          open={!!selectedOwner}
          onOpenChange={() => setSelectedOwner(null)}
        />
      )}
    </div>
  )
}

