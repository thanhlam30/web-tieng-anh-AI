package webtienganh.utils;

@FunctionalInterface
public interface MyConsumer<T> {

	void handle(T s);
}
