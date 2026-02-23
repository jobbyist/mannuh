import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search as SearchIcon, Users, User, Newspaper, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Simple debounce
  const timeoutRef = useMemo(() => ({ current: null as ReturnType<typeof setTimeout> | null }), []);
  const handleSearch = (value: string) => {
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setDebouncedQuery(value), 300);
  };

  const searchQuery = trpc.search.all.useQuery(
    { query: debouncedQuery },
    { enabled: debouncedQuery.length > 0 }
  );

  const results = searchQuery.data;
  const hasResults = results && (results.groups.length > 0 || results.creators.length > 0 || results.content.length > 0);

  return (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">Search</h1>
          <p className="text-muted-foreground font-light">Find groups, creators, and content</p>
        </div>

        {/* Search Input */}
        <div className="relative mb-10">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search for anything..."
            className="pl-12 h-12 text-base rounded-xl bg-white"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
          />
        </div>

        {/* Loading */}
        {searchQuery.isLoading && debouncedQuery && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20" />)}
          </div>
        )}

        {/* Results */}
        {hasResults && (
          <div className="space-y-8">
            {/* Groups */}
            {results.groups.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Cell Groups
                </h2>
                <div className="space-y-2">
                  {results.groups.map((group) => (
                    <Link key={group.id} href={`/groups/${group.id}`}>
                      <Card className="hover:shadow-sm transition-shadow cursor-pointer">
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Users className="w-4 h-4 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-foreground truncate">{group.name}</h3>
                            {group.description && <p className="text-sm text-muted-foreground truncate">{group.description}</p>}
                          </div>
                          {group.category && <Badge variant="secondary" className="text-xs shrink-0">{group.category}</Badge>}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Creators */}
            {results.creators.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Creators
                </h2>
                <div className="space-y-2">
                  {results.creators.map((creator) => (
                    <Link key={creator.id} href={`/profile/${creator.id}`}>
                      <Card className="hover:shadow-sm transition-shadow cursor-pointer">
                        <CardContent className="p-4 flex items-center gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={creator.avatarUrl || undefined} />
                            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                              {creator.name?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-foreground">{creator.name || "Creator"}</h3>
                            {creator.bio && <p className="text-sm text-muted-foreground truncate">{creator.bio}</p>}
                          </div>
                          <Badge className="bg-[oklch(0.85_0.06_10)] text-[oklch(0.35_0.08_10)] border-0 text-xs shrink-0">Creator</Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            {results.content.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Newspaper className="w-4 h-4" />
                  Content
                </h2>
                <div className="space-y-2">
                  {results.content.map((item) => (
                    <a key={item.id} href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <Card className="hover:shadow-sm transition-shadow cursor-pointer">
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                            <Newspaper className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-foreground truncate">{item.title}</h3>
                            {item.sourceName && <p className="text-sm text-muted-foreground">{item.sourceName}</p>}
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* No results */}
        {debouncedQuery && !searchQuery.isLoading && !hasResults && (
          <div className="text-center py-16">
            <SearchIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-1">No results found</h3>
            <p className="text-sm text-muted-foreground">Try a different search term</p>
          </div>
        )}

        {/* Empty state */}
        {!debouncedQuery && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Start searching</h3>
            <p className="text-sm text-muted-foreground">Find cell groups, creators, and Christian content</p>
          </div>
        )}
      </div>
    </div>
  );
}
